export const hanoi = (n) => {
    const moves = [];
    hanoiRecurse(n, 1, 2, 3, moves);
    return moves;
}

export const hanoiRecurse = (n, from, buffer, to, moves) => {
    
    if (n <= 1) {
        moves.push([from, to]);
        return moves;
    }   
    hanoiRecurse(n-1, from, to, buffer, moves);
    moves.push([from, to]);
    hanoiRecurse(n-1, buffer, from, to, moves);
    return moves;
    
    

}