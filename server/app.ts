import express = require('express');
import bodyParser = require('body-parser');
import { DiscCollectionController } from './controllers/DiscCollectionController';
import { DiscCollectionService } from './services/DiscColletionService';
import { DiscCollectionRepository } from './repositories/DiscCollectionRepository';
import { DiscController } from './controllers/DiscController';
import { DiscService } from './services/DiscService';
import { DiscRepository } from './repositories/DiscRepository';

const app: express.Application = express();

let discCollectionController = new DiscCollectionController(new DiscCollectionService(new DiscCollectionRepository(), new DiscRepository()));
let discController = new DiscController(new DiscService(new DiscRepository()));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/disccollections', discCollectionController.getAll.bind(discCollectionController));
app.post('/disccollections', discCollectionController.add.bind(discCollectionController));
app.get('/disccollections/:id', discCollectionController.getById.bind(discCollectionController));
app.put('/disccollections/:id', discCollectionController.update.bind(discCollectionController));

app.get('/discs', discController.getAll.bind(discController));
app.post('/discs', discController.add.bind(discController));
app.get('/discs/:id', discController.getById.bind(discController));
app.put('/discs/:id', discController.update.bind(discController));

app.listen(5000, function () {
  console.log('DiscManager API ready on port 5000.');
});