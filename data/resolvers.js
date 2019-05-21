import mongoose from 'mongoose';
import { Clients } from './db';
import { rejects } from 'assert';

export const resolvers = {
	Query: {
		getClients: (root, { last }) => {
			return Clients.find({}).limit(last);
		},
		getClient: (root, { id }) => {
			return new Promise((resolve, object) => {
				Clients.findById(id, (error, client) => {
					if (error) rejects(error);
					else resolve(client);
				});
			});
		}
	},
	Mutation: {
		createClient: (root, { input }) => {
			const newClient = new Clients({
				first_name: input.first_name,
				last_name: input.last_name,
				company: input.company,
				emails: input.emails,
				yob: input.yob,
				typ: input.typ,
				orders: input.orders
			});
			newClient.id = newClient._id;

			return new Promise((resolve, object) => {
				newClient.save((error) => {
					if (error) rejects(error);
					else resolve(newClient);
				});
			});
		},
		updateClient: (root, { input }) => {
			return new Promise((resolve, object) => {
				Clients.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, client) => {
					if (error) rejects(error);
					else resolve(client);
				});
			});
		},
		deleteClient: (root, { id }) => {
			return new Promise((resolve, object) => {
				Clients.findOneAndRemove({ _id: id }, (error) => {
					if (error) rejects(error);
					else resolve('Delete Successful');
				});
			});
		}
	}
};
