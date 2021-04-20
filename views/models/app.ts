
enum AppMODE  {
  STUDENT=  "student",
  MENTOR= "mentor"
}

interface IApp{
  mode : AppMODE
}

class App implements IApp{
  mode

  constructor() {
    this.mode = AppMODE.STUDENT
  }


}
