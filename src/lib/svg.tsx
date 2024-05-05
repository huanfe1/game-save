export const DeleteSvg = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 1024 1024">
        <path
            fill="currentColor"
            d="M360 184h-8c4.4 0 8-3.6 8-8zh304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32M731.3 840H292.7l-24.2-512h487z"
        ></path>
    </svg>
);

export const SaveSvg = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 21H7m10 0h.803c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.427.218-.987.218-2.105V9.22c0-.45 0-.675-.048-.889a1.994 1.994 0 0 0-.209-.545c-.106-.19-.256-.355-.55-.682l-2.755-3.062c-.341-.378-.514-.57-.721-.708a1.999 1.999 0 0 0-.61-.271C15.863 3 15.6 3 15.075 3H6.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 0 0-.874.874C3 4.52 3 5.08 3 6.2v11.6c0 1.12 0 1.68.218 2.107c.192.377.497.683.874.875c.427.218.987.218 2.105.218H7m10 0v-3.803c0-1.118 0-1.678-.218-2.105a2.001 2.001 0 0 0-.875-.874C15.48 14 14.92 14 13.8 14h-3.6c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 0 0-.874.874C7 15.52 7 16.08 7 17.2V21m8-14H9"
        ></path>
    </svg>
);

export const AddSvg = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 256 256">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={16}>
            <circle cx={128} cy={128} r={112}></circle>
            <path d="M 79.999992,128 H 176.0001"></path>
            <path d="m 128.00004,79.99995 v 96.0001"></path>
        </g>
    </svg>
);
