export function getUniqueTag(arr) {
    return arr.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.tag === value.tag
        ))
    )
}
export function getUniqueValue(arr) {
    return arr.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.value === value.value
        ))
    )
}