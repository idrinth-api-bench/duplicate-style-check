export default class Media
{
  private requirements: string[] = [];
  private media: string;
  private options: string[] = [];
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
    if (this.media) {
      return this.media;
    }
    if (this.requirements.length === 0) {
      return this.media = 'general';
    }
    return this.media = this.requirements.join(' and ');
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
    if (this.options.length > 0) {
      for(const option of this.options) {
        yield option;
      }
      return;
    }
    this.options.push('');
    yield '';
    for (const option of this.getAllOptions(0)) {
      this.options.push(option);
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
    if (this.requirements.length === 0) {
      return new Media(media);
    }
    if (media === '') {
      return this;
    }
    return new Media(this.toString() + ' and ' + media);
  }
}
