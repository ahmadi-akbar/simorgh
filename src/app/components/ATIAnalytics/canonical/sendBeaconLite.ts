const sendBeaconLite = (atiPageViewUrlString: string) => `
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "${atiPageViewUrlString}", true);
    xhr.withCredentials = true;
    xhr.send();
`;

export default sendBeaconLite;
