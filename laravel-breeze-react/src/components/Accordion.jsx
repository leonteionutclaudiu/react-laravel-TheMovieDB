import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useState,useEffect  } from "react";

const AccordionCustom = ({ question, answer, isOpen, onToggle }) => {
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
      if (isOpen && !contentLoaded) {
        setContentLoaded(true);
      }
    }, [isOpen, contentLoaded]);

    return (
        <Accordion open={isOpen} className="text-white">
        <AccordionHeader onClick={onToggle} className={`${isOpen ? "text-yellow-500" : ""} hover:text-yellow-500 transition`}>{question}</AccordionHeader>
        <AccordionBody>
        {contentLoaded ? answer : "Loading..."}
      </AccordionBody>
      </Accordion>
    );
}

export default AccordionCustom;
