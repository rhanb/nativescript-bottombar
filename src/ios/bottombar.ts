import { View } from 'ui/core/view';
import { Image } from 'ui/image';
import { Color } from "color";
import { Button } from "ui/button";
var imageSource = require("image-source");

//declare const MiniTabBarItem;
declare const MiniTabBarItem, MiniTabBar, MiniTabBarBadge, MiniTabBarDelegate;



export class TabbarDelegate extends NSObject {
    public static ObjCProtocols = [MiniTabBarDelegate];
    private _owner: WeakRef<Tabbar>;

    public static initWithOwner(owner: WeakRef<Tabbar>): TabbarDelegate {
        let delegate = <TabbarDelegate>TabbarDelegate.new();
        delegate._owner = owner;
        return delegate;
    }

    public tabSelected(index: number) {
        console.log("Selected tab: ", index);
    }
}

export class TabbarItem extends View {

}
export class Tabbar extends View {

    private _ios: any;

    constructor() {
        super();
        let items = new Array<any>();
        var image = new Image();
        var imageSourceValue = imageSource.fromResource('ic_calendar');
        //image.imageSource = imageSourceValue;
        items.push(new MiniTabBarItem({
            title: "Calendar",
            icon: imageSourceValue.ios,
            badge: new MiniTabBarBadge(new Color('blue').ios, new Color('pink').ios, "1")
        }));
        imageSourceValue = imageSource.fromResource('ic_collaborator');
        items.push(new MiniTabBarItem({
            title: "Profile",
            icon: imageSourceValue.ios,
            badge: new MiniTabBarBadge(new Color('blue').ios, new Color('pink').ios, "2")
        }));
        imageSourceValue = imageSource.fromResource('ic_home_black_24dp');
        items.push(new MiniTabBarItem({
            title: "Home",
            icon: imageSourceValue.ios,
            badge: new MiniTabBarBadge(new Color('blue').ios, new Color('pink').ios, "3")
        }));
        imageSourceValue = imageSource.fromResource('ic_paperplane');
        items.push(new MiniTabBarItem({
            title: "Messages",
            icon: imageSourceValue.ios,
            badge: new MiniTabBarBadge(new Color('blue').ios, new Color('pink').ios, "3")
        }));
        /*let customItem;
        var imageProfile = new Image();
        var imageProfileSourceValue = imageSource.fromResource('profile');
        let customButton = new Button().ios;
        customButton.backgroundColor = new Color("#FD7F24").ios;
        customButton.frame.size = new CGSize({ width: 50, height: 50 });
        customButton.layer.cornerRadius = 25;
        customButton.setBackgroundImageForState(imageProfileSourceValue.ios, 0);
        let offset = new UIOffset({ horizontal: 0, vertical: -10.0 });
        //console.dir(customButton);
        console.dir(offset);
        customItem = new MiniTabBarItem({ customView: customButton, offset });
        items.push(customItem);*/
        this._ios = new MiniTabBar({
            items: items
        });
        /*let badge = new GIBadgeView();
        badge.badgeValue = 0;*/
        this._ios.delegate = TabbarDelegate.initWithOwner(new WeakRef(this));
        //this._ios.frame = CGRectMake(0, this._ios.view.frame.height - 44, this._ios.view.frame.width, 44);
        this._ios.frame = CGRectMake(0, 400, 400, 44);
        this._ios.tintColor = new Color("red").ios;

        // Change the font of the title label:
        this._ios.font = UIFont.systemFontOfSize(10);

        // Select an item programmatically: 
        this._ios.selectItemAnimated(2, true);

        // Change the background & key line of the tab bar:
        this._ios.backgroundColor = new Color('black').ios;
        this._ios.backgroundBlurEnabled = true;
        this._ios.keyLine.isHidden = false;

        //this._ios.addSubview(badge);
    }

    public setBadge(badgeIndex: number, badgeValue: string) {
        this._ios.changeBadgeItem(badgeIndex, badgeValue);
    }

    public get ios() {
        return this._ios;
    }

    public get _nativeView() {
        return this._ios;
    }

    onLoaded() {
        super.onLoaded();
    }
}