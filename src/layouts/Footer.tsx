import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button, Title } from "../components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex min-h-[10vh] w-full flex-col justify-center bg-black pb-6 pt-10">
      <div className="mx-auto mb-8">
        <Title />
      </div>
      <div className="flex items-center justify-center gap-16 p-4 text-white">
        <Link
          to="https://github.com/foolais"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost">
            <Github size={30} />
          </Button>
        </Link>
        <Link
          to="https://www.instagram.com/wahyu_esya/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost">
            <Instagram size={30} />
          </Button>
        </Link>
        <Link
          to="https://www.linkedin.com/in/wahyu-esya-nasution-56ba01226/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost">
            <Linkedin size={30} />
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-center text-sm text-primary">
        © 2024 Foolaisx FXMovies
      </p>
    </div>
  );
};

export default Footer;
