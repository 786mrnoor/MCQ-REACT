import { useEffect } from "react";

const TITLE = 'MCQ-APP';
export default function useTitle(title) {
    useEffect(() => {
        if (title) {
            document.title = `${title} | ${TITLE}`;
        } else {
            document.title = TITLE;
        }
    }, [title]);
};
