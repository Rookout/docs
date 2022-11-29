import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';



export const JVMContainerCodeBlock = () => {
    return (
        <BrowserOnly>
            {
                () => {
                    return (
                        <CodeBlock language="bash">
                            {
                                `
ENV ROOKOUT_TOKEN ${sessionStorage?.getItem("token") || '[Your Rookout Token]'}
ENV ROOKOUT_LABELS "env:dev"
                `
                            }
                        </CodeBlock>
                    )
                }
            }
        </BrowserOnly>

    )
}


export  default JVMContainerCodeBlock
