export function getUniqueTag(arr) {
    return arr.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.tag === value.tag
        ))
    )
}