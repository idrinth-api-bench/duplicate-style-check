export default class Media
{
  private requirements: string[] = [];
  constructor(media: string) {
    for (const requirement of media.split('and')) {
      const trimmed = requirement.replace(/^\s+|\s+$/ug, '');
      if (requirement && ! this.requirements.includes(trimmed)) {
        this.requirements.push(trimmed);
      }
    }
    this.requirements.sort();
  }
  public toString(): string
  {
    if (this.requirements.length === 0) {
      return 'general';
    }
    return this.requirements.join(' and ');
  }
  private * getAllOptions(index: number): Generator<string>
  {
    if (! this.requirements[index]) {
      return;
    }
    yield this.requirements[index];
    for (const option of this.getAllOptions(index + 1)) {
      yield `${ this.requirements[index] } and ${ option }`
      yield option;
    }
  }
  public * getOptions(): Generator<string>
  {
    yield '';
    for (const option of this.getAllOptions(0)) {
      yield option;
    }
  }
  public contains(media: Media): boolean
  {
    for (const option of this.getOptions()) {
      if (media.toString() === option) {
        return true;
      }
    }
    return false;
  }
  public createChild(media: string) : Media
  {
    return new Media(this.toString() + ' and ' + media);
  }
}
