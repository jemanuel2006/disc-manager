import 'jasmine';
import { DiscService } from '../server/services/DiscService';
import { Disc } from '../server/domain/Disc';
import { ArgumentNullException } from '../server/domain/ArgumentNullException';
import { ObjectNotFoundException } from '../server/repositories/ObjectNotFoundException';

describe("DiscService - add", function(){
    let repository = jasmine.createSpyObj("repository", ['add']);
    repository.add.and.callFake((d : Disc) => d.Id = 1);
    let service = new DiscService(repository);

    it("should add new disc in repository successfully", async function(){
        let disc = await service.add("Test", 1999);

        expect(disc.Name).toEqual("Test");
        expect(disc.Year).toEqual(1999);
        expect(disc.Id).toEqual(1);
    });

    it("should throw exception with empty name", async function(){
        expectAsync(service.add("", 1999)).toBeRejectedWith(new ArgumentNullException("Parameter 'name' is empty."));
    });
});

describe("DiscService - getAll", function(){
    let repository = jasmine.createSpyObj("repository", ['getAll']);
    let disc1 = new Disc("D1", 1999);
    let disc2 = new Disc("D2", 1999);
    repository.getAll.and.callFake(() => [disc1, disc2]);
    let service = new DiscService(repository);

    it("should get all discs with success", async function(){
        let discs = await service.getAll();

        expect(discs).toEqual([disc1, disc2]);
    });
});

describe("DiscService - getById", function(){
    let repository = jasmine.createSpyObj("repository", ['getById']);
    let disc1 = new Disc("D1", 1999);
    repository.getById.withArgs(1).and.callFake(() => disc1);
    let service = new DiscService(repository);

    it("should get the disc with id with success", async function(){
        let disc = await service.getById(1);

        expect(disc).toEqual(disc1);
    });
});

describe("DiscService - update", function(){
    let disc = new Disc("D1", 1999);
    disc.Id = 1;
    let updatedDisc : Disc;
    let repository = jasmine.createSpyObj("repository", ['update', 'getById']);
    repository.update.and.callFake((d : Disc) => updatedDisc = d);
    repository.getById.withArgs(1).and.callFake(() => disc);
    let service = new DiscService(repository);

    it("should update disc in repository successfully", async function(){
        await service.update(1, "D1 Edited", 2000);

        expect(updatedDisc.Name).toEqual("D1 Edited");
        expect(updatedDisc.Year).toEqual(2000);
        expect(updatedDisc.Id).toEqual(1);
    });

    it("should throw exception with empty name", async function(){
        expectAsync(service.update(1, "", 1999)).toBeRejectedWith(new ArgumentNullException("Parameter 'name' is empty."));
    });

    it("should throw exception with not found disc", async function(){
        let repository = jasmine.createSpyObj("repository", ['update', 'getById']);
        repository.getById.withArgs(1).and.callFake(() => {throw new ObjectNotFoundException("");});
        let service = new DiscService(repository);
        
        expectAsync(service.update(3, "D1 Edited", 2000)).toBeRejectedWith(new ObjectNotFoundException(""));
    });
});