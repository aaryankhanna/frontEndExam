import { _decorator, Component, Node, ParticleSystem, Animation, Button } from "cc";
const { ccclass, property } = _decorator;

@ccclass("NewComponent")
export class NewComponent extends Component {
  @property({ type: Node })
  particleNode: Node = null;

  @property({ type: Node })
  itemNode: Node = null;
  onBagClick() {
    setTimeout(() => {
      this.node.getComponent(Animation).stop();
      this.particleNode.active = true;
      this.node.getComponent(Animation).play("bagOpening");
      this.node.getComponent(Animation).on(Animation.EventType.FINISHED, () => {
        this.particleNode.active = false;
        this.itemNode.active = true;
      });
    }, 1000);
    this.node.getComponent(Animation).play("bagShake");
    this.node.getComponent(Button).interactable = false;
  }
}
