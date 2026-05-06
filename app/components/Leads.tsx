"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Lead = {
	id: number;
	full_name: string;
	email: string;
	company: string;
	source: string;
	message: string;
	created_at: string;
};

export default function Leads() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchLeads = async () => {
			setLoading(true);
			setError("");
			const { data, error } = await supabase
				.from("leads")
				.select("*")
				.order("created_at", { ascending: false });
			if (error) {
				setError(error.message);
			} else {
				setLeads(data || []);
			}
			setLoading(false);
		};
		fetchLeads();
	}, []);

	if (loading) return <div>Loading leads...</div>;
	if (error) return <div className="text-red-600">Error: {error}</div>;

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full border mt-4">
				<thead>
					<tr className="bg-gray-100 text-black">
						<th className="p-2 border">Name</th>
						<th className="p-2 border">Email</th>
						<th className="p-2 border">Company</th>
						<th className="p-2 border">Source</th>
						<th className="p-2 border">Submitted</th>
					</tr>
				</thead>
				<tbody>
					{leads.map((lead) => (
						<tr key={lead.id}>
							<td className="p-2 border">{lead.full_name}</td>
							<td className="p-2 border">{lead.email}</td>
							<td className="p-2 border">{lead.company}</td>
							<td className="p-2 border">{lead.source}</td>
							<td className="p-2 border">{new Date(lead.created_at).toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
			{leads.length === 0 && <div className="mt-4">No leads found.</div>}
		</div>
	);
}
