export const dobCalulate = (dob) => {
    let diff = new Date(Date.now() - dob * 31536000000);
    return diff.toISOString();
}

