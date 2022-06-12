class Generator
{
  static _instance

  static _getInstance ()
  {
    return Generator._instance || (Generator._instance = new Generator())
  }

  generate ()
  {
    //
  }
}

export default Generator._getInstance()
