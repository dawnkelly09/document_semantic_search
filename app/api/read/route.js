//used to perform the queries from the questions asked
import { NextRequest, NextResponse } from 'next/server'
import { PineconeClient } from '@pinecone-database/pinecone'
import {
  queryPineconeVectorStoreAndQueryLLM,
} from '../../../utils'
import { indexName } from '../../../config'

export async function POST(req) {
  const body = await req.json()
  const client = new PineconeClient()
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || ''
  })

  const text = await queryPineconeVectorStoreAndQueryLLM(client, indexName, body)

  return NextResponse.json({
    data: text
  })
}