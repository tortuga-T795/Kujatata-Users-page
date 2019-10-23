export const search = (user, string) => {
    if(string.length === 0 || user === undefined)
        return user;
    return {...user, notes: user.notes.filter( note => note.text.toLowerCase().includes(string))};
};

export const filter = (user, selected) => {
    if(user === undefined)
        return user;
    switch (selected) {
        case 'all':
            return user;
        case 'important':
            return {...user, notes: user.notes.filter(note => note.important)};
        case  'done':
            return {...user, notes: user.notes.filter(note => note.done)};
        case  'active':
            return {...user, notes: user.notes.filter(note => !note.done)};
        default:
            return  user;
    }
};
