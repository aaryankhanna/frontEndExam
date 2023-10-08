import { _decorator, Component, instantiate, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Items
 * DateTime = Sun Oct 08 2023 19:32:36 GMT+0530 (India Standard Time)
 * Author = aaryan0
 * FileBasename = Items.ts
 * FileBasenameNoExtension = Items
 * URL = db://assets/interview_backpack_exam/Items.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass("Items")
export class Items extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;
  @property({ type: Prefab })
  itemprefab: Prefab = null;
  @property({ type: Node })
  container: Node = null;
  protected onLoad(): void {
    console.log("Hello");
    for (let i = 0; i < 7; i++) {
      let item = instantiate(this.itemprefab);
      this.container.addChild(item);
    }
  }
  start() {
    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
