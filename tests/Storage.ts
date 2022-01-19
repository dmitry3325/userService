import storage from '@/common/Storage';
import { expect } from 'chai';
import { AbstractEntity } from '../src/common/AbstractEntity';

class Test extends AbstractEntity {
  testField!: string;
}

const createCount = 10;

const data = {
  testField: 'TestValue',
};

storage.initEntityStorage(Test.name);

describe('Storage', () => {
  it('Should create', () => {
    for (let i = 1; i <= createCount; i++) {
      const id = storage.create(Test.name, data);
      expect(id).to.equal(i);
    }
  });

  it('Should fetch', () => {
    const test = storage.find(Test, 1);
    expect(test.testField).to.equal('TestValue');
  });

  it('Should update', () => {
    const res = storage.update(Test.name, 1, { testField: 'anotherValue' });
    expect(res).to.equal(true);
    const test1 = storage.find(Test, 1);
    expect(test1.testField).to.equal('anotherValue');
  });

  it('Should fetch', () => {
    const test1 = storage.find(Test, 1);
    expect(test1.testField).to.equal('anotherValue');
    const testLast = storage.find(Test, createCount);
    expect(testLast.testField).to.equal('TestValue');
  });

  it('Should fetch all', () => {
    const testList = storage.findAll(Test);
    expect(testList).to.have.length(createCount);
  });

  it('Should find by param', () => {
    const testList = storage.findBy(Test, { testField: 'anotherValue' });
    expect(testList).to.have.length(1);
    expect(testList[0].id).to.equal(1);
  });
});
