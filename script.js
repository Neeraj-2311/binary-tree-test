function createSection(value) {
    const section = document.createElement('section');
    if (value) {
        section.classList.add('has-value');
        const div = document.createElement('div');
        div.classList.add('node');
        div.textContent = value;
        section.appendChild(div);
    }
    return section;
}

function createTreeLevel() {
    const container = document.createElement('div');
    container.classList.add('tree-level');
    return container;
}

function buildTree(rootKey, tree) {
    const result = document.createElement('div');
    result.classList.add('tree-container');
    
    const levels = new Map();
    
    function traverseTree(key, level) {
        if (!levels.has(level)) {
            levels.set(level, createTreeLevel());
        }
        
        const currentLevel = levels.get(level);
        const section = createSection(key);
        currentLevel.appendChild(section);
        
        if (!levels.has(level + 1)) {
            levels.set(level + 1, createTreeLevel());
        }
        const childLevel = levels.get(level + 1);
        
        if (tree.has(key)) {
            const children = tree.get(key);
            const childSection1 = createSection(children[0]);
            const childSection2 = createSection(children[1]);
            childLevel.appendChild(childSection1);
            childLevel.appendChild(childSection2);
            
            if (children[0]) traverseTree(children[0], level + 1);
            if (children[1]) traverseTree(children[1], level + 1);
        } else {
            const emptySection1 = createSection();
            const emptySection2 = createSection();
            childLevel.appendChild(emptySection1);
            childLevel.appendChild(emptySection2);
        }
    }
    
    traverseTree(rootKey, 0);
    
    for (let i = 0; i < levels.size; i++) {
        result.appendChild(levels.get(i));
    }
    
    return result;
}

const tree = new Map();
tree.set('a', ['b', 'c']);
tree.set('b', ['b1', 'b2']);
tree.set('c', ['c1', 'c2']);
tree.set('c2', ['c21', 'c22']);

const container = document.getElementById('tree');
const treeStructure = buildTree('a', tree);
container.appendChild(treeStructure);