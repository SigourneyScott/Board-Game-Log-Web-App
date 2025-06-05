import { Team } from "./team.ts"
export interface Session {
	_id?: string,
	link: string;
	imgSrc: string;
	game: string;
	date: string;
	sym: boolean;
	teams: Array<Team>;
}