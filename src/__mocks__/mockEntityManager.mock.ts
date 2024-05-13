import { EntityManager } from "typeorm";

interface mockManagerArgs {
    saveReturn?: Object | [Object]
    findOneReturn?: Object
}

export const getMockEntityManager = async ({
    saveReturn = undefined,
    findOneReturn = undefined
}: mockManagerArgs): Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {}

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn))
    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn))
    manager.delete = jest.fn()

    return manager as EntityManager
}
