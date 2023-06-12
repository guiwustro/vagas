export interface IFakeData {
	id: number;
	name: string;
	job: string;
	readTimes?: number;
	isAdmin?: boolean;
	password: string;
}

const fakeData: IFakeData[] = [
	{
		id: 1,
		name: "João Oliveira",
		job: "Desenvolvedor",
		password: ''
	},

];

export default fakeData