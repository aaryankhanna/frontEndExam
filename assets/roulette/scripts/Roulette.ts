import { _decorator, Button, Color, color, Component, director, game, Game, JsonAsset, Label, log, Node, Quat, randomRangeInt, sp, Sprite, Tween, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Roulette")
export class Roulette extends Component {
  @property(JsonAsset)
  numberToAngleMapping: JsonAsset = null;
  @property({ type: Node })
  stopBtn: Node = null;
  @property({ type: Node })
  startBtn: Node = null;
  @property({ type: Node })
  randomNumberNode: Node = null;
  @property({ type: Label })
  randomNumberLabel: Label = null;
  @property({ type: Node })
  welcomeNode: Node = null;

  onLoad() {
    this.scheduleOnce(() => (this.welcomeNode.active = false), 3);
  }
  startSpin() {
    tween(this.node).by(5, { angle: 360 }).repeatForever().start();
    this.startBtn.getComponent(Button).interactable = false;
    this.startBtn.getComponent(Sprite).color = new Color(255, 255, 255, 109);
  }

  reset(): void {
    setTimeout(() => {
      this.randomNumberNode.active = false;
      this.startBtn.getComponent(Button).interactable = true;
      this.startBtn.getComponent(Sprite).color = new Color(255, 255, 255, 255);
      this.stopBtn.getComponent(Button).interactable = true;
      this.stopBtn.getComponent(Sprite).color = new Color(255, 255, 255, 255);
    }, 2000);
  }
  stopSpin() {
    this.randomNumberNode.active = true;
    this.stopBtn.getComponent(Button).interactable = false;
    this.stopBtn.getComponent(Sprite).color = new Color(255, 255, 255, 109);
    const randomStopNumber = randomRangeInt(0, 37);
    this.randomNumberLabel.string = `${randomStopNumber}`;
    const stopAngle = this.numberToAngleMapping.json[randomStopNumber.toString()];
    Tween.stopAllByTarget(this.node);
    let curr = this.node.angle;
    let timeDiff = 360 - (curr % 360);
    let resetToZero = tween(this.node).by(timeDiff / 72, { angle: 360 - (curr % 360) });
    let endTime = 360 - stopAngle;
    let sendToDestination = tween(this.node).by(endTime / 72, { angle: 360 - stopAngle });
    tween(this.node)
      .sequence(resetToZero, sendToDestination)
      .call(() => {
        this.reset();
      })
      .start();
  }
}
