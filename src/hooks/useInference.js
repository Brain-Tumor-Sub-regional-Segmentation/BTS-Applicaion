export const useInference = () =>  {
    async function segment(files) {
        // const response = await fetch(
        //     "https://api-inference.huggingface.co/models/juliensimon/autotrain-food101-1471154050",
        //     {
        //         headers: { Authorization: "Bearer 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" },
        //         method: "POST",
        //         body: data,
        //     }
        // );
        const result = await response.json();
        return result;
    }
    return {segment}
} 