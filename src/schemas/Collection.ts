import Entity from "@/schemas/entity";

type Collection<EntityType = Entity> ={
    data: EntityType[],
    links: {
        self: string,
        next?: string
    },
    meta: {
        totalItems: number,
        itemsPerPage: number,
        currentPage: number
    },
    included?: Entity[]
}

export default Collection;