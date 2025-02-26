export  function trimStringWithEllipsis(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }

    return str.slice(0, maxLength) + '...';
}
