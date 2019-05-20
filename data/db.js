import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clients', {useNewUrlParser: true});

const clientsSchema = new mongoose.Schema({
  first_name : String,
  last_name : String,
  company : String,
  emails : Array,
  yob : Number,
  typ : String,
  orders : Array

});

const Clients = mongoose.model('clients', clientsSchema );

export {Clients};