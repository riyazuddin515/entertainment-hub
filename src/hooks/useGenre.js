const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return ''
    const ids = selectedGenres.map(g => g.id);
    return ids.reduce((acc, cur) => acc + ',' + cur);
}
export default useGenre