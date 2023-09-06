// import nc from 'next-connect';
// import { getRepos, createRepo, updateRepo, checkDuplicateRepoName } from '../../../service/repository.service';
// import { auth } from '../../../middleware/auth';
import { createEdgeRouter } from "next-connect";
import {getRepos, createRepo, updateRepo, checkDuplicateRepoName} from '../../../service/repository.service'
import { auth } from '../../../middleware/auth'
import { NextResponse } from "next/server";

const router = createEdgeRouter();

router
	.get(auth('getUsers'), async (req) => {
		let company_id = req.user.company_id;

		const repos = await getRepos(company_id);

        return NextResponse.json(repos,{status:200})
	})
	// add a new repo against a company
	.post(auth('getUsers'), async (req, res) => {
		let company_id = req.user.company_id;

		const { name: repo_name, status, repo_type } = req.body;

		const errors = [];

		const is_duplicate = await checkDuplicateRepoName(repo_name, company_id);

		if (+is_duplicate > 0) {
			errors.push('Duplicate entry');
			if (errors.length > 0) {
                return NextResponse.json({ errors }, { status: 200 });
				// res.status(200).json({ errors });
				// return;
			}
		}

		const result = await createRepo({ repo_name, status, company_id, repo_type, user_id: req.user.id });
		//res.status(201).send(result);
        return NextResponse.json(result,{status:201})
	})
	.put(async (req, res) => {
		const result = await updateRepo(req.body);
        return NextResponse.json(result,{status:200})
		//res.status(200).send(result);
	});

export async function GET(request, ctx){
    try{
		await auth(request);
		let company_id = request.user.company_id;
		const repos = await getRepos(company_id);
		return NextResponse.json(repos,{status:200})
	}
	catch(error){
		console.log(error);
		return NextResponse.json(error,{status:500})
	}
}



export async function POST(request, ctx){
    try{
		await auth(request);
		let company_id = request.user.company_id;
		const body = await request.json();
		const { name: repo_name, status, repo_type } = body;
		const errors = [];
		const is_duplicate = await checkDuplicateRepoName(repo_name, company_id);
		if (is_duplicate > 0) {
			errors.push('Duplicate entry');
			if (errors.length > 0) {
				return NextResponse.json({ errors }, { status: 200 });
			}
		}
		const result = await createRepo({ repo_name, status, company_id, repo_type, user_id: request.user.id });
		return NextResponse.json(result,{status:201})
	}
	catch(error){
		console.log(error);
		return NextResponse.json(error,{status:500})
	}
}

export async function PUT(request, ctx){
    try{
		const body = await request.json();
		const result = await updateRepo(body);
		return NextResponse.json(result,{status:200})
	}
	catch(error){
		console.log(error);
		return NextResponse.json(error,{status:500})
	}
}

