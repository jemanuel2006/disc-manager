import 'jasmine';
import { DiscCollectionService } from '../server/services/DiscColletionService';
import { Disc } from '../server/domain/Disc';
import { ArgumentNullException } from '../server/domain/ArgumentNullException';
import { ObjectNotFoundException } from '../server/repositories/ObjectNotFoundException';
import { DiscCollection } from '../server/domain/DiscCollection';

describe("DiscCollectionService - add", function(){
    let repository = jasmine.createSpyObj("repository", ['add']);
    repository.add.and.callFake((d : DiscCollection) => d.Id = 1);
    let discRepository = jasmine.createSpyObj("discRepository", ['getByIds']);
    let d1 = new Disc("D1", 1999);
    let d2 = new Disc("D2", 1999);
    discRepository.getByIds.and.callFake((n : number[]) => [d1, d2]);
    let service = new DiscCollectionService(repository, discRepository);

    it("should add new disc collection in repository successfully", async function(){
        let col = await service.add("Test", [1,2]);

        expect(col.Name).toEqual("Test");
        expect(col.Discs).toEqual([d1, d2]);
        expect(col.Id).toEqual(1);
    });

    it("should throw exception with empty name", async function(){
        expectAsync(service.add("", [1,2])).toBeRejectedWith(new ArgumentNullException("Parameter 'name' is empty."));
    });
});

describe("DiscCollectionService - getAll", function(){
    let repository = jasmine.createSpyObj("repository", ['getAll']);
    let col1 = new DiscCollection("C1");
    let col2 = new DiscCollection("C2");
    repository.getAll.and.callFake(() => [col1, col2]);
    let discRepository = jasmine.createSpyObj("discRepository", ['getByIds']);
    let service = new DiscCollectionService(repository, discRepository);

    it("should get all disc collections with success", async function(){
        let cols = await service.getAll();

        expect(cols).toEqual([col1, col2]);
    });
});

describe("DiscCollectionService - getById", function(){
    let repository = jasmine.createSpyObj("repository", ['getById']);
    let col1 = new DiscCollection("C1");
    repository.getById.withArgs(1).and.callFake(() => col1);

    let discRepository = jasmine.createSpyObj("discRepository", ['getByDiscCollection']);
    let d1 = new Disc("D1", 1999);
    let d2 = new Disc("D2", 1999);
    discRepository.getByDiscCollection.withArgs(1).and.callFake((n : number) => [d1, d2]);
    
    let service = new DiscCollectionService(repository, discRepository);

    it("should get the disc collection with id and disc associations with success", async function(){
        let col = await service.getById(1);

        expect(col).toEqual(col1);
        expect(col.Discs).toEqual([d1, d2]);
    });
});

describe("DiscCollectionService - getByIdWithoutAssociation", function(){
    let repository = jasmine.createSpyObj("repository", ['getById']);
    let col1 = new DiscCollection("C1");
    repository.getById.withArgs(1).and.callFake(() => col1);

    let discRepository = jasmine.createSpyObj("discRepository", ['getById']);

    let service = new DiscCollectionService(repository, discRepository);

    it("should get the disc collection with id without disc associations with success", async function(){
        let col = await service.getByIdWithoutAssociation(1);

        expect(col).toEqual(col1);
        expect(col.Discs).toEqual([]);
    });
});

describe("DiscCollectionService - update", function(){
    let coll = new DiscCollection("C1");
    coll.Id = 1;
    let updatedCollection : DiscCollection;
    let repository = jasmine.createSpyObj("repository", ['update', 'getById']);
    repository.update.and.callFake((d : DiscCollection) => updatedCollection = d);
    repository.getById.withArgs(1).and.callFake(() => coll);

    let discRepository = jasmine.createSpyObj("discRepository", ['getByIds']);
    let d1 = new Disc("D1", 1999);
    let d2 = new Disc("D2", 1999);
    discRepository.getByIds.withArgs([3,4]).and.callFake((n : number[]) => [d1, d2]);

    let service = new DiscCollectionService(repository, discRepository);

    it("should update disc collection in repository successfully", async function(){
        await service.update(1, "C1 Edited", [3,4]);

        expect(updatedCollection.Name).toEqual("C1 Edited");
        expect(updatedCollection.Id).toEqual(1);
        expect(updatedCollection.Discs).toEqual([d1, d2]);
    });

    it("should throw exception with empty name", async function(){
        expectAsync(service.update(1, "", [3,4])).toBeRejectedWith(new ArgumentNullException("Parameter 'name' is empty."));
    });

    it("should throw exception with not found disc collection", async function(){
        let repository = jasmine.createSpyObj("repository", ['update', 'getById']);
        repository.getById.withArgs(1).and.callFake(() => {throw new ObjectNotFoundException("");});
        let service = new DiscCollectionService(repository, discRepository);

        expectAsync(service.update(3, "D1 Edited", [3,4])).toBeRejectedWith(new ObjectNotFoundException(""));
    });
});