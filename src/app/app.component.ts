import { Component, OnInit } from '@angular/core';
import { PathNode } from './path-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private depth = 20;
  public mazeGrid: PathNode[][] = [];

  ngOnInit() {
    console.log('init');
    this.mazeGrid = this.generateGrid();
  }

  onResetClicked() {
    console.log('clicked');
    this.mazeGrid = this.generateGrid();
  }

  onShowResultClicked() {
    console.log('clicked');
    this.findShortestPath();
  }

  onCellClicked(node: PathNode) {
    console.log('Cell clicked');
    if (!node.isBlocked) {
      node.isSelected = !node.isSelected;
    }
  }

  private generateGrid(): PathNode[][] {
    let grid: PathNode[][] = [];

    for (let i = 0; i < this.depth; i++) {
      grid[i] = [];
      for (let j = 0; j < this.depth; j++) {
        grid[i][j] = new PathNode(i, j, this.getRandom());
      }
    }

    grid[0][0].isBlocked = false;
    grid[this.depth - 1][this.depth - 1].isBlocked = false;
    return grid;
  }

  private getRandom(): boolean {
    return Math.floor(Math.random() * 4) === 0;
  }

  private findShortestPath() {
    let queue: PathNode[] = [];
    queue.push(this.mazeGrid[0][0]);

    while (true) {
      let node = queue.shift();
      //console.log(node);

      if (node == null) { break; }
      if (node.isChecked || node.isBlocked) { continue; }

      node.isChecked = true;

      if (node.x === this.depth - 1 && node.y === this.depth - 1) {
        break;
      }

      for (let n of this.getChildren(node)) {
        if (!n.isChecked) {
          n.parent = node;
          queue.push(n);
        }
      }
    }

    let endNode = this.mazeGrid[this.depth - 1][this.depth - 1];
    while (endNode != null) {
      endNode.isSelected = true;
      endNode = endNode.parent;
    }
  }

  private getChildren(node: PathNode): PathNode[] {
    let list: PathNode[] = [];

    if (node.x > 0) { list.push(this.mazeGrid[node.x - 1][node.y]); }
    if (node.x < this.depth - 1) { list.push(this.mazeGrid[node.x + 1][node.y]); }
    if (node.y > 0) { list.push(this.mazeGrid[node.x][node.y - 1]); }
    if (node.y < this.depth - 1) { list.push(this.mazeGrid[node.x][node.y + 1]); }

    console.log(node, list);
    return list;
  }
}
