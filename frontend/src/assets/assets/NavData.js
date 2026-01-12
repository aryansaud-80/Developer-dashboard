import HomeIcon from "../icons/HomeIcon";
import BarIcon from "../icons/BarIcon";
import TimeIcon from "../icons/TimeIcon";
import NewsIcon from "../icons/NewsIcon";
import StackIcon from "../icons/StackIcon";
import CodeBracketIcon from "../icons/CodeBracketIcon";
import GithubIcon from "../icons/GithubIcon";

const nav = [
  {
    icon: HomeIcon,
    name: "Dashboard",
    to: "/",
  },
  {
    icon: BarIcon,
    name: "Todo List",
    to: "/todo-list",
  },
  {
    icon: StackIcon,
    name: "Today's Task",
    to: "/today-task",
  },
  {
    icon: CodeBracketIcon,
    name: "Code Snippets",
    to: "/code-snippets",
  },
  {
    icon: TimeIcon,
    name: "Pomodoro Timer",
    to: "/pomodoro-timer",
  },
  {
    icon: GithubIcon,
    name: "Github Activity",
    to: "/github-activity",
  },
  {
    icon: NewsIcon,
    name: "Tech News",
    to: "/news",
  },
];

export default nav;
