import { Client, Account, Databases, Storage, ID } from 'appwrite';
import {
    APPWRITE_ENDPOINT,
    APPWRITE_PROJECT,
    APPWRITE_DATABASE
} from '@env';

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = APPWRITE_DATABASE;
const AGENTS_COLLECTION_ID = '68403e02002f68d75729';
const GALLERIES_COLLECTION_ID = '68404c360038e9c2fa53';
const REVIEW_COLLECTION_ID = '68404d79000f8d8608f0'
const PROPERTY_COLLECTION_ID = '68404e35002a4366f362';


export {
    client,
    account,
    databases,
    storage,
    ID,
    DATABASE_ID,
    AGENTS_COLLECTION_ID,
    GALLERIES_COLLECTION_ID,
    REVIEW_COLLECTION_ID,
    PROPERTY_COLLECTION_ID,
};
