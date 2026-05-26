declare module "locomotive-scroll" {
  export default class LocomotiveScroll {
    constructor(options: any);
    on(event: string, callback: any): void;
    update(): void;
    destroy(): void;
    scrollTo(target: any, options?: any, duration?: any): void;
    scroll: {
      instance: {
        scroll: {
          y: number;
        };
      };
    };
  }
}
