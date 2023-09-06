import {createCompany, updateCompany, getList} from '../../../service/company.service'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try{
        const body = await request.json()
        const result = await createCompany(body)
        return NextResponse.json(result, {status: 201})
    }
    catch(error){
        return NextResponse.json(error, {status: 500})
    }
}

export async function PUT(request) {
    try{
        const body = await request.json()
        const result = await updateCompany(body)
        return NextResponse.json(result, {status: 200})
    }
    catch(error){
        return NextResponse.json(error, {status: 500})
    }
}

export async function GET() {
    try{
        const result = await getList()
        return NextResponse.json(result, {status: 201})
    }
    catch(error){
        return NextResponse.json(error, {status: 500})
    }
}