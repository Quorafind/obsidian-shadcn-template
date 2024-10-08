import { Plugin, WorkspaceLeaf } from 'obsidian';
import './global.css';
import { CustomShadcnView, VIEW_TYPE } from './view';

export default class ShadcnStarter extends Plugin {
  async onload(): Promise<void> {
    this.registerView(VIEW_TYPE, (leaf: WorkspaceLeaf) => new CustomShadcnView(leaf));
    this.addRibbonIcon('calendar', 'shadcn-template', () => {
      this.app.workspace.getLeaf(true).setViewState({
        type: VIEW_TYPE,
      });
    });

    document.body.toggleClass('@container', true);
  }

  onunload() {
    super.onunload();
    document.body.toggleClass('@container', false);
  }
}
