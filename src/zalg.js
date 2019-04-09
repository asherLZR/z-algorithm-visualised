export function linear_search (txt, k, j_start) {
    let i = k;
    let j = j_start;
    while (i < txt.length && txt [i] == txt [j]) {
        i++;
        j++;
    }
    if (j == j_start) {
        return -(1);
    }
    else {
        return i;
    }
}

export function zalg(pat) {
    let store = []   
    
    let n = pat.length;
    let z_array = Array(n).fill(-1);
    let l = 0;
    let r = 0;
   
    const collectVariables = function(l, r, branch){
        store.push({
            l: l,
            r: r,
            z_array: Array.from(z_array),
            branch: branch
        })
    }

    collectVariables(l, r, undefined)

    for (let k = 1; k < n; k++) {
        if (k > r) {
            let r_k = linear_search (pat, k, 0);
            if (r_k == -(1)) {
                z_array [k] = 0;
                collectVariables(l, r, -1)
            }
            else {
                z_array [k] = r_k - k;
                l = k;
                r = r_k - 1;
                collectVariables(l, r, -2)
            }
        }
        // compare the sizes of z-boxes
        else if (z_array [k - l] < (r - k) + 1) {
            z_array [k] = z_array [k - l];
            collectVariables(l, r, -3)
        }
        else if (z_array [k - l] > (r - k) + 1) {
            z_array [k] = (r - k) + 1;
            collectVariables(l, r, -4)
        }
        else {
            let r_k = linear_search (pat, r + 1, (r - k) + 1);
            if (r_k == -(1)) {
                z_array [k] = (r - k) + 1;
                collectVariables(l, r, -5)
            }
            else {
                z_array [k] = r_k - k;
                r = r_k - 1;
                l = k;
                collectVariables(l, r, -6)
            }
        }
    }
    return store;
}