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
export const toExcerpt = (str, length) => {
    if (str?.length > length) {
        return str.slice(0, length) + '...'
    } else {
        return str
    }

}