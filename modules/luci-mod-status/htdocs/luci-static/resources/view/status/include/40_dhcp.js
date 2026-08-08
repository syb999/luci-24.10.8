'use strict';
'require baseclass';
'require rpc';
'require uci';
'require network';
'require validation';

var callLuciDHCPLeases = rpc.declare({
	object: 'luci-rpc',
	method: 'getDHCPLeases',
	expect: { '': {} }
});

return baseclass.extend({
	title: '',

	isMACStatic: {},
	isDUIDStatic: {},

	macPrefixToDevice: {},

	deviceIcons: {
		"mi": "/luci-static/resources/icons/devices/mi.png",
		"apple": "/luci-static/resources/icons/devices/apple.png",
		"huawei": "/luci-static/resources/icons/devices/huawei.png",
		"honor": "/luci-static/resources/icons/devices/honor.png",
		"oppo": "/luci-static/resources/icons/devices/oppo.png",
		"realme": "/luci-static/resources/icons/devices/realme.png",
		"vivo": "/luci-static/resources/icons/devices/vivo.png",
		"lenovo": "/luci-static/resources/icons/devices/lenovo.png",
		"orangepi": "/luci-static/resources/icons/devices/orangepi.png",
		"dell": "/luci-static/resources/icons/devices/dell.png",
		"iqoo": "/luci-static/resources/icons/devices/iqoo.png",
		"mijia": "/luci-static/resources/icons/devices/mijia.png",
		"tmall": "/luci-static/resources/icons/devices/tmall.png",
		"xiaotiancai": "/luci-static/resources/icons/devices/xiaotiancai.png",
		"router": "/luci-static/resources/icons/devices/router.png",
		"tv": "/luci-static/resources/icons/devices/tv.png",
		"motorola": "/luci-static/resources/icons/devices/motorola.png",
		"panel_ap": "/luci-static/resources/icons/devices/panel_ap.png",
		"voip_fxs": "/luci-static/resources/icons/devices/voip_fxs.png",
		"printer": "/luci-static/resources/icons/devices/printer.png",
		"iptv": "/luci-static/resources/icons/devices/iptv.png",
		"nas": "/luci-static/resources/icons/devices/nas.png",
		"midea": "/luci-static/resources/icons/devices/midea.png",
		"default": "/luci-static/resources/icons/devices/pc.png"
	},

	initMacPrefixMap: function() {
		var map = this.macPrefixToDevice;

		["10:3f:44", "2c:d0:66", "58:20:59", "64:a2:00", "64:cc:2e", 
		 "8e:49:53", "98:f6:21", "a4:50:46", "b6:3c:d2", "ea:ea:9d",
		 "ec:41:18", "e8:ca:c8", "f4:f5:db"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "mi";
		});

		["00:5b:94", "34:a8:eb", "50:82:d5", "64:20:0c", "7a:51:e7", 
		 "80:be:05", "ae:0b:09", "b8:c1:11", "e2:c1:63", "dc:a9:04"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "apple";
		});

		["02:5f:84", "02:f8:ea", "04:4f:4c", "12:65:e3", "18:3c:b7", 
		 "22:17:16", "22:35:b4", "22:df:c6", "24:31:54", "30:a2:c2", 
		 "32:bc:0e", "3c:cd:5d", "50:01:d9", "62:7f:f0", "6a:fc:40", 
		 "74:59:09", "7c:a1:77", "82:51:80", "82:a0:d3", "82:a5:6b", 
		 "82:ef:22", "90:2b:d2", "96:c9:cb", "9c:b2:b2", "a2:65:69", 
		 "a8:e5:44", "b2:3d:8c", "c2:56:e7", "c2:98:4b", "c2:d0:55", 
		 "d2:7e:7b", "dc:16:b2", "e2:08:88", "f2:49:84", "f2:6f:80", 
		 "f2:f9:db"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "huawei";
		});

		["22:f2:24", "32:5e:86", "a2:84:d5", "b2:8b:c8", "e4:a7:c5"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "honor";
		});

		["08:4a:cf", "60:21:01", "0a:b1:0e", "3a:01:c5", "ac:c4:bd",
		 "b4:20:5b"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "oppo";
		});


		["d0:5a:fd"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "realme";
		});

		["2a:da:93"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "vivo";
		});

		["ac:38:70"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "lenovo";
		});

		["02:81:eb"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "orangepi";
		});

		["00:22:5f"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "dell";
		});

		["3e:54:f7", "8e:a3:3b", "be:22:ff", "f6:c2:4b"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "iqoo";
		});

		["64:90:c1", "5c:e5:0c", "44:23:7c"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "mijia";
		});

		["84:44:af", "8c:6d:50", "78:da:07"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "tmall";
		});

		["e0:76:d0"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "xiaotiancai";
		});

		["04:5f:a7", "20:76:93", "38:83:45", "3c:40:4f", "78:a3:51", 
		 "78:d3:8d", "88:c3:97", "cc:08:fb", "d4:ee:07", "dc:d8:7c"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "router";
		});

		["2c:e0:32", "6c:22:1a"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "tv";
		});

		["50:2f:bb", "16:0a:de"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "motorola";
		});

		["74:96:37", "8a:0c:ca"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "panel_ap";
		});

		["00:21:f2"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "voip_fxs";
		});

		["9c:ae:d3"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "printer";
		});

		["00:07:63", "00:ac:1f", "04:95:73", "0c:56:5c", "30:50:fd", 
		 "74:c9:a3", "74:ff:4c", "78:53:0d", "90:d8:f3", "ac:00:d0", 
		 "c8:64:c7", "f4:4c:70"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "iptv";
		});

		["00:11:32"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "nas";
		});

		["f0:c9:d1"].forEach(function(prefix) {
			map[prefix.toLowerCase()] = "midea";
		});
	},

	getDeviceIcon: function(macAddr) {
		if (!macAddr || macAddr.length < 8) {
			return E('img', {
				'src': this.deviceIcons.default,
				'title': _('Unknown device'),
				'style': 'width: 24px; height: 24px; vertical-align: middle;'
			});
		}
		
		var macPrefix = macAddr.substring(0, 8).toLowerCase();
		var deviceType = this.macPrefixToDevice[macPrefix] || "default";
		var icon = this.deviceIcons[deviceType] || this.deviceIcons.default;
		
		return E('img', {
			'src': icon,
			'title': this.getDeviceTitle(deviceType),
			'style': 'width: 24px; height: 24px; vertical-align: middle;'
		});
	},

	getDeviceTitle: function(deviceType) {
		var titles = {
			"mi": _("Xiaomi"),
			"apple": _("Apple"),
			"huawei": _("Huawei"),
			"honor": _("Honor"),
			"oppo": _("OPPO"),
			"realme": _("realme"),
			"vivo": _("vivo"),
			"lenovo": _("Lenovo"),
			"orangepi": _("Orange Pi"),
			"dell": _("Dell"),
			"iqoo": _("iQOO"),
			"mijia": _("Mi Home"),
			"tmall": _("Tmall Genie"),
			"xiaotiancai": _("Xiaotiancai"),
			"router": _("Router"),
			"tv": _("TV"),
			"motorola": _("Motorola"),
			"panel_ap": _("Panel AP"),
			"voip_fxs": _("VoIP FXS"),
			"printer": _("Printer"),
			"iptv": _("IPTV"),
			"nas": _("NAS"),
			"midea": _("Midea"),
			"default": _("PC/Other")
		};
		
		return titles[deviceType] || titles["default"];
	},

	duidToMac: function(duid) {
		if (!duid) return null;

		if (duid.length === 28 && duid.substr(0, 8) === '00010001')
			return duid.substr(16).replace(/(..)(?=..)/g, '$1:').toUpperCase();

		if (duid.length === 24 && duid.substr(0, 8) === '00030001')
			return duid.substr(8).replace(/(..)(?=..)/g, '$1:').toUpperCase();

		return null;
	},

	load: function() {
		this.initMacPrefixMap();

		return Promise.all([
			callLuciDHCPLeases(),
			network.getHostHints(),
			L.resolveDefault(uci.load('dhcp'))
		]);
	},

	handleCreateStaticLease: function(lease, ev) {
		ev.currentTarget.classList.add('spinning');
		ev.currentTarget.disabled = true;
		ev.currentTarget.blur();

		var cfg = uci.add('dhcp', 'host');
		uci.set('dhcp', cfg, 'name', lease.hostname);
		uci.set('dhcp', cfg, 'ip', lease.ipaddr);
		uci.set('dhcp', cfg, 'mac', [lease.macaddr.toUpperCase()]);

		return uci.save()
			.then(L.bind(L.ui.changes.init, L.ui.changes))
			.then(L.bind(L.ui.changes.displayChanges, L.ui.changes));
	},

	handleCreateStaticLease6: function(lease, ev) {
		ev.currentTarget.classList.add('spinning');
		ev.currentTarget.disabled = true;
		ev.currentTarget.blur();

		var cfg = uci.add('dhcp', 'host'),
		    ip6arr = lease.ip6addrs[0] ? validation.parseIPv6(lease.ip6addrs[0]) : null;

		uci.set('dhcp', cfg, 'name', lease.hostname);
		uci.set('dhcp', cfg, 'duid', lease.duid.toUpperCase());
		uci.set('dhcp', cfg, 'mac', [lease.macaddr]);
		if (ip6arr)
			uci.set('dhcp', cfg, 'hostid', (ip6arr[6] * 0xFFFF + ip6arr[7]).toString(16));

		return uci.save()
			.then(L.bind(L.ui.changes.init, L.ui.changes))
			.then(L.bind(L.ui.changes.displayChanges, L.ui.changes));
	},

	renderLeases: function(data) {
		var leases = Array.isArray(data[0].dhcp_leases) ? data[0].dhcp_leases : [],
		    leases6 = Array.isArray(data[0].dhcp6_leases) ? data[0].dhcp6_leases : [],
		    machints = data[1].getMACHints(false),
		    hosts = uci.sections('dhcp', 'host'),
		    isReadonlyView = !L.hasViewPermission();

		for (var i = 0; i < hosts.length; i++) {
			var host = hosts[i];

			if (host.mac) {
				var macs = L.toArray(host.mac);
				for (var j = 0; j < macs.length; j++) {
					var mac = macs[j].toUpperCase();
					this.isMACStatic[mac] = true;
				}
			}
			if (host.duid) {
				var duid = host.duid.toUpperCase();
				this.isDUIDStatic[duid] = true;
			}
		};

		var table = E('table', { 'id': 'status_leases', 'class': 'table lases' }, [
			E('tr', { 'class': 'tr table-titles' }, [
				E('th', { 'class': 'th' }, _('Logo')),
				E('th', { 'class': 'th' }, _('Hostname')),
				E('th', { 'class': 'th' }, _('IPv4 address')),
				E('th', { 'class': 'th' }, _('MAC address')),
				E('th', { 'class': 'th' }, _('Lease time remaining')),
				isReadonlyView ? E([]) : E('th', { 'class': 'th cbi-section-actions' }, _('Static Lease'))
			])
		]);

		cbi_update_table(table, leases.map(L.bind(function(lease) {
			var exp, rows;

			if (lease.expires === false)
				exp = E('em', _('unlimited'));
			else if (lease.expires <= 0)
				exp = E('em', _('expired'));
			else
				exp = '%t'.format(lease.expires);

			var hint = lease.macaddr ? machints.filter(function(h) { return h[0] == lease.macaddr })[0] : null,
			    host = null;

			if (hint && lease.hostname && lease.hostname != hint[1])
				host = '%s (%s)'.format(lease.hostname, hint[1]);
			else if (lease.hostname)
				host = lease.hostname;

			rows = [
				this.getDeviceIcon(lease.macaddr),
				'%h'.format(host || '-'),
				lease.ipaddr,
				E('code', { 'style': 'font-family: monospace;' }, lease.macaddr),
				exp
			];

			if (!isReadonlyView && lease.macaddr != null) {
				var mac = lease.macaddr.toUpperCase();
				rows.push(E('button', {
					'class': 'cbi-button cbi-button-apply',
					'click': L.bind(this.handleCreateStaticLease, this, lease),
					'disabled': this.isMACStatic[mac]
				}, [ _('Set Static') ]));
			}

			return rows;
		}, this)), E('em', _('There are no active leases')));

		var table6 = E('table', { 'id': 'status_leases6', 'class': 'table leases6' }, [
			E('tr', { 'class': 'tr table-titles' }, [
				E('th', { 'class': 'th' }, _('Logo')),
				E('th', { 'class': 'th' }, _('Host')),
				E('th', { 'class': 'th' }, _('IPv6 address')),
				E('th', { 'class': 'th' }, _('DUID')),
				E('th', { 'class': 'th' }, _('Lease time remaining')),
				isReadonlyView ? E([]) : E('th', { 'class': 'th cbi-section-actions' }, _('Static Lease'))
			])
		]);

		cbi_update_table(table6, leases6.map(L.bind(function(lease) {
			var exp, rows;

			if (lease.expires === false)
				exp = E('em', _('unlimited'));
			else if (lease.expires <= 0)
				exp = E('em', _('expired'));
			else
				exp = '%t'.format(lease.expires);

			var hint = lease.macaddr ? machints.filter(function(h) { return h[0] == lease.macaddr })[0] : null,
			    host = null;

			if (hint && lease.hostname && lease.hostname != hint[1] && lease.ip6addr != hint[1])
				host = '%s (%s)'.format(lease.hostname, hint[1]);
			else if (lease.hostname)
				host = lease.hostname;
			else if (hint)
				host = hint[1];

			var macFromDuid = this.duidToMac(lease.duid);
			var icon = macFromDuid ? this.getDeviceIcon(macFromDuid) : this.getDeviceIcon(lease.macaddr);

			rows = [
				icon,
				'%h'.format(host || '-'),
				lease.ip6addrs ? lease.ip6addrs.join('<br />') : lease.ip6addr,
				E('code', { 'style': 'font-family: monospace; word-break: break-all;' }, lease.duid),
				exp
			];

			if (!isReadonlyView && lease.duid != null) {
				var duid = lease.duid.toUpperCase();
				rows.push(E('button', {
					'class': 'cbi-button cbi-button-apply',
					'click': L.bind(this.handleCreateStaticLease6, this, lease),
					'disabled': this.isDUIDStatic[duid]
				}, [ _('Set Static') ]));
			}

			return rows;
		}, this)), E('em', _('There are no active leases')));

		return E([
			E('h3', _('Active DHCP Leases')),
			table,
			E('h3', _('Active DHCPv6 Leases')),
			table6
		]);
	},

	render: function(data) {
		if (L.hasSystemFeature('dnsmasq') || L.hasSystemFeature('odhcpd'))
			return this.renderLeases(data);

		return E([]);
	}
});
