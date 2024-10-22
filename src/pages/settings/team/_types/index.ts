// These file probably be deleted later if backend api gives us these

export interface Member {
	id: string;
	name: string;
	email: string;
	role: "admin" | "member";
	joinedAt: Date;
}
