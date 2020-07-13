import {getNamespace, getService, getServicesRunningOnNamespaces} from "../src/extractors";
import { expect } from "chai";
import {NmapResult} from "../src/interfaces";


describe("Nmap positve results", () => {
    const hostname = '10-1-0-2.kube-dns.kube-system.svc.cluster.local';
    const nmapResults: Array<NmapResult> = [
        { hostname: '10-1-0-2.foo.kube-system.svc.cluster.local',
            ip: '10.1.0.2',
            mac: '92:74:21:4F:07:91',
            openPorts: null,
            osNmap: null,
            vendor: undefined },
        { hostname: '10-1-0-3.bar.kube-system.svc.cluster.local',
            ip: '10.1.0.3',
            mac: '6E:4F:91:39:E7:48',
            openPorts: null,
            osNmap: null,
            vendor: undefined },
    ]
    it("Parses namespace",() =>{
        expect(getNamespace(hostname)).equal('kube-system')
    });
    it("Parses service",() =>{
        expect(getService(hostname)).equal('kube-dns')
    });
    it("Groups services by namespace",() =>{
        expect(getServicesRunningOnNamespaces(nmapResults)).eql
        ({
            'kube-system':['foo','bar']
        }
        )
    });
});

describe("Nmap negative results", () => {
    const hostname = 'foo-wrong';
    const nmapResults: NmapResult[] = [
        { hostname: 'none-on',
            ip: '10.1.0.2',
            mac: '92:74:21:4F:07:91',
            openPorts: null,
            osNmap: null,
            vendor: undefined },
        { hostname: 'there is none',
            ip: '10.1.0.3',
            mac: '6E:4F:91:39:E7:48',
            openPorts: null,
            osNmap: null,
            vendor: undefined },
    ]
    it("Does not parse namespace",() =>{
        expect(getNamespace(hostname)).equal(undefined)
    });
    it("Does not parse service",() =>{
        expect(getService(hostname)).equal(undefined)
    });
    it("Groups services by namespace",() =>{
        expect(getServicesRunningOnNamespaces(nmapResults)).eql
        ({})
    });
});