export default interface Rules {
  [selector: string]: {
    [media: string]: {
      [property: string]: string
    }
  }
}
