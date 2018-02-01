export class PathNode {
    public constructor(public x: number,
        public y: number,
        public isBlocked: boolean,
        public parent?: PathNode,
        public isSelected?: boolean,
        public isChecked?: boolean) {}
}
