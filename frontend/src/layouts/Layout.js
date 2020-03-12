import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import BuildIcon from "@material-ui/icons/Build"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ComputerIcon from "@material-ui/icons/Computer"
import ExtensionIcon from "@material-ui/icons/Extension"
import HomeIcon from "@material-ui/icons/Home"
import ListAltIcon from "@material-ui/icons/ListAlt"
import PersonIcon from "@material-ui/icons/Person"
import SettingsIcon from "@material-ui/icons/Settings"
import clsx from "clsx"
import React, { useContext } from "react"
import Logo from "../components/Logo/Logo"
import Nav from "../components/Nav/Nav"
import { User } from "../components/User/User"
import { AuthContext } from "../context/AuthContext"

const drawerWidth = 240
const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		background: "linear-gradient(45deg, #2A5470 30%, #4C4177 90%)",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: "0",
		...theme.mixins.toolbar,
	},
	toolbarIconOpen: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		transform: "rotate(180deg)",
		margin: "0",
		...theme.mixins.toolbar,
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		overflow: "hidden",
		width: drawerWidth,
		border: "none",
		boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
		backgroundColor: "rgba(255, 255, 255, .75)",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		padding: theme.spacing(2),
		maxWidth: "100%",
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}))

export default function Layout({ children }) {
	const auth = useContext(AuthContext)
	const isAuth = auth.isAuth

	const items = [
		{ href: "/", label: "Home", Icon: HomeIcon, exact: true },
		// { href: "/news", label: "News", Icon: DescriptionIcon },
	]

	const itemsAuth = [
		{ href: "/", label: "Home", Icon: HomeIcon, exact: true },
		// { href: "/news", label: "News", Icon: "news" },
		{ href: "/profile", label: "Profile", Icon: PersonIcon },
		{ href: "/build", label: "Builder", Icon: BuildIcon },
		// "divider",
		{
			href: "",
			label: "Admin",
			Icon: SettingsIcon,
			items: [
				{ name: "pc", label: "Pc", href: "/admin/pc", Icon: ComputerIcon },
				{
					name: "catalog",
					label: "Catalog",
					href: "/admin/catalog",
					Icon: ListAltIcon,
					items: [
						{
							name: "pc",
							label: "Motherboards",
							href: "/admin/catalog/motherboards",
							Icon: ExtensionIcon,
						},
						{
							name: "catalog",
							label: "Videocards",
							href: "/admin/catalog/videocards",
							Icon: ExtensionIcon,
						},
					],
				},
			],
		},
	]
	const classes = useStyles()
	const [open, setOpen] = React.useState(true)
	const handleDrawerToggle = () => {
		setOpen(() => !open)
	}

	return (
		<div className={classes.root}>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(
						classes.drawerPaper,
						open ? classes.drawerPaperOpen : classes.drawerPaperClose,
					),
				}}
				open={open}
			>
				<Divider />
				<Nav items={isAuth ? itemsAuth : items} />
				<Divider />
				<User />
				<Divider />
				<Logo>
					<div className={open ? classes.toolbarIcon : classes.toolbarIconOpen}>
						<IconButton onClick={handleDrawerToggle}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
				</Logo>
			</Drawer>

			<main className={classes.content}>
				<div className={classes.appBarSpacer}>
					<Container className={classes.container}>{children}</Container>
				</div>
			</main>
		</div>
	)
}
