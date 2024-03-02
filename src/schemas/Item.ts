import Entity from "@/schemas/entity";

type Item<EntityType = Entity> = {
    data: EntityType,
    included ?: Entity[],
}

export default Item;