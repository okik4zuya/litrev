export function getUniqueTag(arr) {
    return arr.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.tag === value.tag
        ))
    )
}
export function getUniquePaper(arr) {
    return arr.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.title === value.title
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