
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

const WEBHOOK_URL = 'https://webhook-receiver-flax.vercel.app/api/lead-webhook';
const CANDIDATE_NAME = 'Satya Nandan Thota';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { full_name, email, company, source, message } = body;

        console.log('Received lead:', { full_name, email, company, source, message });
		// Basic validation
		if (!full_name || !email) {
			return NextResponse.json({ error: 'Full name and email are required.' }, { status: 400 });
		}

		// Insert into Supabase
		const { data, error } = await supabase
			.from('leads')
			.insert([{ full_name, email, company, source, message }])
			.select()
			.single();

		if (error) {
            console.log('Supabase error:', error);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		// webhook
		fetch(WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Candidate-Name': CANDIDATE_NAME,
			},
			body: JSON.stringify({ full_name, email, company, source, message }),
		}).catch((err) => {
			// Log webhook failure (console for now)
			console.error('Webhook failed:', err);
		});

		return NextResponse.json({ success: true, lead: data });
	} catch (err: any) {
		return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
	}
}
