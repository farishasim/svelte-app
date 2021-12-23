export const enhance = (forms: HTMLFormElement, {
    result
}) => {
    
    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        try {
            const body = new FormData(forms);
            const res = await fetch(forms.action, {
                method: forms.method,
                headers: {
                    accept: "application/json"
                },
                body
            });

            if (res.ok) {
                result(res, forms);
            } else {
                console.error("Fetch error", await res.text())
            }
        } catch (error) {
            console.error("Could not submit form", error);
        }
    }

    forms.addEventListener("submit", handleSubmit)
    
    return {
        destroy() {
            forms.removeEventListener("submit", handleSubmit);
        }
    }
}